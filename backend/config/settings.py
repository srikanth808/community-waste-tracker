import os
import dj_database_url

# Allow local + Railway host
ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "community-waste-tracker-production.up.railway.app"
]

# Dynamically add Railway provided host if available
RAILWAY_STATIC_URL = os.getenv("RAILWAY_STATIC_URL")
if RAILWAY_STATIC_URL:
    ALLOWED_HOSTS.append(
        RAILWAY_STATIC_URL.replace("https://", "").replace("http://", "")
    )

# Database configuration
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get("DATABASE_URL"),
        conn_max_age=600,
        ssl_require=True
    )
}

# Static files (CSS, JS, Images)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Whitenoise for serving static files in production
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # make sure this is above common middleware
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Optional: Better static file caching
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
