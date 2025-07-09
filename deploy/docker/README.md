# Docker Deployment

This directory contains Docker configuration files for deploying the Carbon app.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/carbon-app/carbon.git
cd carbon
```

2. Build and run:
```bash
cd deploy/docker
docker-compose up --build -d
```

3. Access the application at http://localhost:3000

## Files

- `Dockerfile` - Multi-stage Docker build configuration
- `docker-compose.yml` - Container orchestration
- `.dockerignore` - Build context exclusions

## Commands

### Using Docker Compose

Start the application:
```bash
docker-compose up -d
```

Build and start:
```bash
docker-compose up --build -d
```

View logs:
```bash
docker-compose logs -f carbon-app
```

Stop the application:
```bash
docker-compose down
```

### Using Docker directly

Build image:
```bash
docker build -t carbon-app -f Dockerfile ../../
```

Run container:
```bash
docker run -d --name carbon-app -p 3000:3000 carbon-app
```

## Configuration

### Environment Variables

Set in `docker-compose.yml`:
- `NODE_ENV` - Node.js environment (default: production)
- `NEXT_TELEMETRY_DISABLED` - Disable Next.js telemetry (default: 1)
- `PORT` - Application port (default: 3000)

### Port Mapping

Change the host port by modifying the ports section in `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"  # Access via localhost:8080
```

## Troubleshooting

### Build Issues

Increase Docker memory allocation if builds fail due to memory constraints.

### Port Conflicts

If port 3000 is in use, change the host port mapping in `docker-compose.yml`.

### Container Health

The container includes health checks. View status with:
```bash
docker-compose ps
```

### Logs

View application logs:
```bash
docker-compose logs carbon-app
```

Follow logs in real-time:
```bash
docker-compose logs -f carbon-app
```

## Production

For production deployments:

1. Use a reverse proxy (nginx, traefik)
2. Configure proper logging
3. Set up monitoring and alerting
4. Use orchestration tools (Docker Swarm, Kubernetes)
5. Implement backup strategies

## Updates

To update the application:

1. Pull latest changes:
```bash
git pull origin main
```

2. Rebuild and restart:
```bash
cd deploy/docker
docker-compose down
docker-compose up --build -d
```