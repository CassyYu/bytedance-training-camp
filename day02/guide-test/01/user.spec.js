const User = require('./User')

test("should getName ", () => {
  // given
  const user = new User("xiaohong");
  // when
  user.setName("xiaohei");
  
  // then
  expect(user,getName()).toBe("xiaohei");
})