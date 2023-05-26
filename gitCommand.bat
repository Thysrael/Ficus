@echo off
setlocal enabledelayedexpansion

set "COMMAND=%~1"

:execute_command
echo Executing command: %COMMAND%
for /f "tokens=1 delims=:" %%a in ('%COMMAND% 2^>^&1') do (
    set output=%%a
    if "!output:~0,34!"=="kex_exchange_identification " (
        echo Output found: !output!
        goto execute_command
    ) else (
        echo !output!
    )
)

echo No matching output found. Exiting.
