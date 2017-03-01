# Thingsboard

Use this to compile and run thningsboard.io from source

# Installation
Initially there are 3 steps: build the package, start and initialise the newly instantiated cassandra database with a new schema and start the application:
```
bin/build
bin/db
bin/run
```

After that modify code, build a new version and restart the app:
```
bin/rebuild
```

