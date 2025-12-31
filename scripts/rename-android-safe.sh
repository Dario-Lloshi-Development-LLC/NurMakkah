#!/usr/bin/env bash
set -euo pipefail

# Safe Android package rename scaffold
# This script only performs discovery and prints the commands required to
# perform an atomic rename. It DOES NOT execute destructive moves by default.

OLD_PACKAGE="com.nurmakkah"
NEW_PACKAGE="com.nur_makkah" # adjust as needed

echo "Android package rename helper"
echo "Old package: ${OLD_PACKAGE}"
echo "New package: ${NEW_PACKAGE}"

echo "\n1) Files that reference the package:"
rg "${OLD_PACKAGE}" -n || true

echo "\n2) Suggested move commands (review before running):\n"
echo "# Example: move source directory"
echo "git mv android/app/src/main/java/$(echo ${OLD_PACKAGE} | tr . /) android/app/src/main/java/$(echo ${NEW_PACKAGE} | tr . /)"

echo "\n# Example: update package declarations (run after moving):"
echo "rg -l \"^package ${OLD_PACKAGE}\" android | xargs sed -i 's/package ${OLD_PACKAGE}/package ${NEW_PACKAGE}/g'"

echo "\n# Example: update applicationId in Gradle (if changing):"
echo "sed -n '1,200p' android/app/build.gradle | sed -n '1,200p'"

echo "\nThis script is informational. If you want to perform the rename, re-run with --apply (not implemented by default)."

exit 0
