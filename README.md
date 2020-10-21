# whoopsmonitor-alert-smtp
Alert the check result with mail sending via SMTP.

## Build
```sh
docker build -t whoopsmonitor-alert-smtp .
```

## Run image
```bash
docker run --rm --env-file .env whoopsmonitor-alert-smtp
```

## Environmental variables
- `WM_SMTP_HOST`
- `WM_SMTP_PORT`
- `WM_SMTP_SECURE`
- `WM_SMTP_USER`
- `WM_WM_SMTP_PASSWORD`
- `WM_SMTP_FROM`
- `WM_SMTP_TO`

### Multiple recipients
You can enter multiple recipients into the `WM_SMTP_TO` property. Just separate addressess with comma.

### Example
Details of the check in Whoops Monitor configuration tab or for the `.env` file.

```yaml
WM_SMTP_HOST=domain.com
WM_SMTP_PORT=587
WM_SMTP_SECURE=false
WM_SMTP_USER=my@email.com
WM_SMTP_PASSWORD=pass
WM_SMTP_FROM=John Doe
WM_SMTP_TO=alert@email.com
```


## Shared variables
Every check will receive these variables to work with:

 - `WM_CHECK_NAME`, name of the check you entered in monitor.
 - `WM_CHECK_EXIT_CODE`, ok (0), warning (1) or critical (2).
 - `WM_CHECK_OUTPUT`, output related to the check result.
