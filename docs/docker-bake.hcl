variable "VERSION" {
  default = "dev"
}

variable "REGISTRIES" {
  default = "asia-south1-docker.pkg.dev/aurva-gcp"
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
  platforms = [ "linux/amd64","linux/arm64"]
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