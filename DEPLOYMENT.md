# WormGPT Docker Deployment Guide

This guide explains how to deploy the WormGPT application using Docker with nginx as a reverse proxy.

## Architecture

- **nginx**: Serves static files (HTML, CSS, JS) and proxies API requests to Flask
- **Flask**: Handles API requests for chat functionality
- **Docker Compose**: Orchestrates both services

## Python Requirements

- **Python Version**: 3.11+ (recommended)
- **Package Manager**: pip3
- **Dependencies**: Listed in `requirements.txt`
- **Virtual Environment**: Recommended for local development

## Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Python 3.11+ (for local development)
- pip3 (Python package manager)
- Your API key configured in `config.json`

### Deployment

1. **Build and start the services:**

   ```bash
   docker-compose up --build -d
   ```

2. **Check service status:**

   ```bash
   docker-compose ps
   ```

3. **View logs:**

   ```bash
   # All services
   docker-compose logs

   # Specific service
   docker-compose logs nginx
   docker-compose logs flask
   ```

4. **Access the application:**
   - Open your browser to `http://localhost`
   - The nginx service will serve the static files and proxy API calls

### Configuration

#### Environment Variables

You can customize the deployment using environment variables:

```bash
# In docker-compose.yml or .env file
FLASK_ENV=production
FLASK_DEBUG=0
```

#### API Configuration

Update `config.json` with your API settings:

```json
{
  "api_key": "your-api-key-here",
  "base_url": "https://openrouter.ai/api/v1",
  "model": "tngtech/deepseek-r1t2-chimera:free",
  "language": "English"
}
```

#### Frontend Configuration

The application uses a dynamic configuration system:

- **Development**: `config.js` - Automatically detects localhost and uses direct Flask connection
- **Production**: Uses relative URLs that nginx proxies to Flask

**Configuration Files:**

- `config.js` - Development configuration with automatic environment detection
- `config.prod.js` - Production configuration (optional override)

**Key Features:**

- ✅ Automatic environment detection (development vs production)
- ✅ Dynamic API URL resolution
- ✅ No hardcoded URLs in production
- ✅ Easy configuration management

## Service Details

### nginx Service

- **Port**: 80 (HTTP)
- **Static Files**: Serves HTML, CSS, JS directly
- **API Proxy**: Routes `/api/*` requests to Flask
- **Security**: Includes security headers and rate limiting
- **Caching**: Static assets cached for 1 year

### Flask Service

- **Port**: 5000 (internal)
- **Python**: 3.11-slim base image
- **Package Manager**: pip3
- **API Endpoints**:
  - `POST /api/chat` - Chat functionality
  - `GET /health` - Health check
- **Environment**: Production optimized

## Management Commands

### Start Services

```bash
docker-compose up -d
```

### Stop Services

```bash
docker-compose down
```

### Restart Services

```bash
docker-compose restart
```

### Update Services

```bash
docker-compose down
docker-compose up --build -d
```

### View Logs

```bash
# Follow logs in real-time
docker-compose logs -f

# Specific service logs
docker-compose logs -f nginx
docker-compose logs -f flask
```

### Health Checks

```bash
# Check nginx health
curl http://localhost/health

# Check Flask health
curl http://localhost:5000/health
```

## Production Considerations

### Security

- nginx includes security headers
- Rate limiting on API endpoints
- Non-root user execution
- Input validation

### Performance

- Static file caching
- Gzip compression
- Connection pooling
- Health checks

### Monitoring

- Health check endpoints
- Structured logging
- Container health monitoring

## Troubleshooting

### Common Issues

1. **Port already in use:**

   ```bash
   # Check what's using port 80
   sudo lsof -i :80
   # Or change port in docker-compose.yml
   ```

2. **API not working:**

   - Check Flask service logs: `docker-compose logs flask`
   - Verify API key in `config.json`
   - Test health endpoint: `curl http://localhost/health`

3. **Static files not loading:**

   - Check nginx logs: `docker-compose logs nginx`
   - Verify file permissions
   - Check nginx configuration

4. **Python/pip3 issues:**
   - Ensure Python 3.11+ is installed: `python3 --version`
   - Check pip3 installation: `pip3 --version`
   - For local development, use virtual environment: `python3 -m venv venv`
   - Install dependencies: `pip3 install -r requirements.txt`

### Local Development Setup

#### Quick Setup (Recommended)

Use the provided setup script:

```bash
# Make script executable and run
chmod +x setup.sh
./setup.sh

# Activate virtual environment
source venv/bin/activate

# Run the application
python3 server.py
```

#### Manual Setup

For manual setup without Docker:

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip3 install -r requirements.txt

# Run the application
python3 server.py
```

### Debug Mode

To enable debug mode for development:

```bash
# Set environment variable
export FLASK_DEBUG=1

# Or modify docker-compose.yml
environment:
  - FLASK_DEBUG=1
```

## Scaling

For production scaling, consider:

1. **Load Balancer**: Add nginx load balancer
2. **Multiple Flask Instances**: Scale Flask service
3. **Database**: Add persistent storage
4. **SSL/TLS**: Add HTTPS support
5. **Monitoring**: Add monitoring stack

## SSL/HTTPS Setup

To add SSL support:

1. Add SSL certificates to nginx
2. Update nginx.conf for HTTPS
3. Add redirect from HTTP to HTTPS
4. Update docker-compose.yml ports

Example nginx SSL configuration:

```nginx
server {
    listen 443 ssl;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    # ... rest of configuration
}
```
