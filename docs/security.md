# Security

## So, is base safe to use?
> Bridged internally uses base for all of the service operation, including non opensourced services such as accounts-services (private). Base runs on any platform ensuring super secure connection.

All request are validated by TOTP for CLI, no-origin web apps, and embedded app. and for authenticated apps such as user interaction and OAuth app, It's secured by accounts services.

So you can
- build your app with base
- build your own cloud service with base
In a most secure way.
