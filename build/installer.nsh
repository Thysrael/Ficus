!macro customInstall
   WriteRegStr HKCU "SOFTWARE\Classes\.md" "" "ficus.t"
   WriteRegStr HKCU "SOFTWARE\Classes\ficus.t\DefaultIcon" "" "$INSTDIR\ficus.exe"
   WriteRegStr HKCU "SOFTWARE\Classes\ficus.t\shell\open\command" "" '"$INSTDIR\ficus.exe" "%1"'
!macroend
!macro customUninstall
   DeleteRegKey HKCU "SOFTWARE\Classes\ficus.t"
!macroend