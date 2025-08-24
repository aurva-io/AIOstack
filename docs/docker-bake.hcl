variable "VERSION" {
  default = "dev"
}

variable "REGISTRIES" {
  default = "public.ecr.aws/l5a6x1y4"
}

group "default" {
  targets = [
    "aiostack-docs"
  ]
}

target "aiostack-docs" {
  dockerfile = "./Dockerfile"
  context    = "."
  args = {
    ENV_TAG = VERSION
  }
  tags      = get_tags("aiostack-docs")
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