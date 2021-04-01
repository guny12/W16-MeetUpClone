
function addCountAndAdminName(targetGroup, groupIds){
for (group of targetGroup) {
  group.dataValues["count"] = await UserGroupJoin.count({ where: { groupId: group.dataValues.id } });

  let owner = await User.findOne({
    where: { id: group.dataValues.adminId },
    attributes: ["firstName"],
  });
  group.dataValues["adminName"] = owner.firstName;
  groupIds.push(group.dataValues.id);
}
}
