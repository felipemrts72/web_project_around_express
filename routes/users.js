const parsedUsersData = JSON.parse(users);
const user = parsedUsersData.find((user) => user.id === req.params.id);
if (!user) {
  res.status(404).send({ message: "Usuário não encontrado" });
} else {
  res.send({ data: user });
}
