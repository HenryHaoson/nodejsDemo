var db = require('../db/db');

exports.queryUsers = function (data, callback) {
    var sql = 'select userId , userName ,password , groupId ' +
        'from user where 1=1';

    for (let key in data) {
        if (data[key] !== '') {
            sql += ' and ' + key + " = '" + data[key] + "'";
        }
    }

    console.log('查询用户信息：' + sql);

    db.mysqlPool.getConnection(function(err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'userDAL.queryUsers()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function(err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'userDAL.queryUsers()');
                return callback(true, '查询失败');
            }
            return callback(false, results);
        });
    });
};
/**
 * 新增用户
 * @param userInfo
 * @param callback
 */
exports.addUser = function (userInfo, callback) {
    let sql = "INSERT INTO user set ";

    let addSql = '';

    for (let key in userInfo) {
        if (userInfo[key] !== '') {
            if(addSql.length === 0) {
                addSql += key + " = '" + userInfo[key] + "'";
            } else {
                addSql += ' , ' + key + " = '" + userInfo[key] + "'";
            }
        }
    }

    sql += addSql;

    console.log('增加用户信息：' + sql);

    db.mysqlPool.getConnection(function(err, connection) {
        if (err) {
            errAlert('数据库连接失败！' + err, 'userDAL.addUserInfo()');
            return callback(true, '连接数据库失败');
        }

        connection.query(sql, function(err, results) {
            connection.release();

            if (err) {
                errAlert('sql语句：' + err, 'userDAL.addUserInfo()');
                return callback(true, '增加用户失败');
            }
            return callback(false, results);
        });
    });
};