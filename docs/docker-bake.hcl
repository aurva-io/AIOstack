variable "VERSION" {
  default = "dev"
}

variable "REGISTRIES" {
  default = "119191042565.dkr.ecr.ap-south-1.amazonaws.com"
}

group "default" {
  targets = [
    "ai-stack-docs"
  ]
}

target "ai-stack-docs" {
  dockerfile = "./Dockerfile"
  context    = "."
  args = {
    ENV_TAG = VERSION
  }
  tags      = get_tags("ai-stack-docs")
  platforms = ["linux/arm64"]
}

function "get_tags" {
  params = [name]
  result = [
    for registry in split(",", REGISTRIES) :
      registry == "asia-south1-docker.pkg.dev/aurva-gcp" ? 
        format("%s/%s/%s:%s", registry, name, name, VERSION) : 
        format("%s/%s:%s", registry, name, VERSION) 
  ]
}