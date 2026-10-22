#!/bin/sh
set -eu
command -v node >/dev/null 2>&1 || { echo 'Node.js 22+ is required. Install Node, then rerun.' >&2; exit 1; }
task_script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
exec node "$task_script_dir/scripts/install.mjs" "$@"
