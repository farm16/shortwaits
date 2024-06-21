# Shortwaits
A Free scheduling software.
Organize your business with 24/7 automated online booking, reminders, payments, and more!

## User permissions vs Account permissions

Business User(staff) roles are:

- `superAdmin`
- `backgroundAdmin`
- `admin`
- `staff` (default) - everyone has this permission

## Scripts

```bash
  # "start": "nx serve",
  # "admin": "nx serve sw-mobile-admin",
  # "admin:pods": "nx run-ios sw-mobile-admin --install",
  # "admin:ios": "nx run-ios sw-mobile-admin --install",
  # "admin:react": "nx start sw-mobile-admin",
  # "backend": "nx serve sw-api",
  # "backend:seed": "yarn nx run sw-api:seed --configuration=default-data",

  yarn start
  yarn admin
  yarn admin:pods
  yarn admin:ios
  yarn admin:react
```

## Resources

https://blog.alesanchez.es/building-authentication-for-microservices-using-nestjs/

## Troubleshooting

➜ adb -s R38M9045JXT reverse tcp:8081 tcp:8081

## PM2

https://pm2.keymetrics.io/docs/usage/quick-start/

When our application is up and running, we have to save the process list we want to respawn for when the system reboots unexpectedly:
`pm2 save`

We can check our running applications with:
`pm2 status`

Monitor our apps:
`pm2 monit`

View logs:
`pm2 logs`

#### with Config file

https://pm2.keymetrics.io/docs/usage/application-declaration/

Start all applications
`pm2 start ecosystem.config.js`

Stop all
`pm2 stop ecosystem.config.js`

Restart all
`pm2 restart ecosystem.config.js`

Reload all
`pm2 reload ecosystem.config.js`

Delete all
`pm2 delete ecosystem.config.js`
