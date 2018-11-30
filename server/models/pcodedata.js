/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pcodedata', {
    uprn: {
      type: DataTypes.BIGINT,
      primaryKey:true,
      allowNull: true
    },
    sub_building_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    building_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    building_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    street_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    post_town: {
      type: DataTypes.STRING,
      allowNull: true
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    local_custodian_code: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    county: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rm_organisation_name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'pcodedata',
    schema: 'cqc',
    createdAt: false,
    updatedAt: false
  });
};