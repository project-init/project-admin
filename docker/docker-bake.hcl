variable "STAGE" {
  default = "local"
}

variable "VERSION" {
  default = "development"
}

variable "DOCKER_BUILD_TARGET" {}

variable "IMAGE_NAME" {
  default = "project-admin"
}

variable "ARGS" {
  default = ""
}

function "args" {
  params = []
  result = { for arg in compact(distinct(split(",", "${ARGS}"))) : split("=", arg)[0] => split("=", arg)[1] }
}

target "app" {
  secret = ["type=env,id=GITHUB_TOKEN,env=GITHUB_TOKEN"]
  target = DOCKER_BUILD_TARGET
  platforms = ["linux/arm64"]
  dockerfile = "docker/app/Dockerfile"
  tags = ["${IMAGE_NAME}-app:${VERSION}"]
  args = {
    VERSION = VERSION
  }
}

group "default" {
  targets = ["app"]
}
