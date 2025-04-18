#!/bin/bash

# Build the Next.js application
npm run build

# Create the deployment directory
DEPLOY_DIR="deploy"
mkdir -p $DEPLOY_DIR

# Copy necessary files
cp -r .next $DEPLOY_DIR/
cp -r public $DEPLOY_DIR/
cp -r package.json $DEPLOY_DIR/
cp -r package-lock.json $DEPLOY_DIR/
cp -r next.config.js $DEPLOY_DIR/
cp -r .env $DEPLOY_DIR/
cp -r prisma $DEPLOY_DIR/

# Create a start script
cat > $DEPLOY_DIR/start.sh << 'EOL'
#!/bin/bash
npm install
npx prisma generate
npx prisma db push
npm run start
EOL

chmod +x $DEPLOY_DIR/start.sh

echo "Deployment package created in $DEPLOY_DIR directory"
echo "To deploy:"
echo "1. Upload the contents of $DEPLOY_DIR to your hosting"
echo "2. SSH into your hosting"
echo "3. Run: cd /path/to/deployed/directory && ./start.sh" 