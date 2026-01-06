# Keystore Upload Instructions

To enable signed Android builds in CI, provide the following GitHub Secrets in the repository (Settings → Secrets):

- `KEYSTORE_BASE64`: Base64-encoded contents of your release keystore (`.jks` or `.keystore`).
- `KEYSTORE_PASSWORD`: Password for the keystore file.
- `KEY_ALIAS`: Alias name of the key inside the keystore.
- `KEY_PASSWORD`: Password for the key alias.

How to generate `KEYSTORE_BASE64` (local machine):

```bash
# Example: encode the keystore as base64
base64 my-release-key.jks > my-release-key.jks.b64
# Then copy the content and store in GitHub Secrets as VALUE of KEYSTORE_BASE64
cat my-release-key.jks.b64
```

Or on one line:

```bash
cat my-release-key.jks | base64 | tr -d '\n' | pbcopy # macOS; on Linux just copy the output
```

Security notes:
- Do NOT commit your keystore to the repo.
- Store backups of the keystore in a secure vault (1Password/Vault) and encrypt local copies when stored.
