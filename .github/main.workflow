workflow "setup" {
	on = "push"
	resolves = ["setup", "coveralls"]
}

action "setup" {
	uses = "actions/npm@master"
  args = "setup"
}

action "coveralls" {
	needs = "setup"
	uses = "actions/npm@master"
  args = "coveralls"
}