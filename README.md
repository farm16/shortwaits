# Shortwaits

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

When our application is up and running, we have to save the process list we want to respawn for when the system reboots unexpectedly:
`pm2 save`

We can check our running applications with:
`pm2 status`

Monitor our apps:
`pm2 monit`

View logs:
`pm2 logs`
