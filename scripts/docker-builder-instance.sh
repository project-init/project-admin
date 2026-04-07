set -e

if ! docker buildx ls | grep -q ^te-docker-builder; then
  docker buildx create --name te-docker-builder --driver=docker-container --driver-opt default-load=true --use --bootstrap;
fi