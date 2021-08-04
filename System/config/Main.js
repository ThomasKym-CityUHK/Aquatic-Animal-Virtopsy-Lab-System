
//user = sampleUserData;
function _ini(){
  PageCtrl._ini();
  MenuCtrl._ini();
  DashboardCtrl._ini();
  //StrandingCasesCtrl._ini();
  //MapViewCtrl._ini();
  //FileManagementViewCtrl._ini();
}
$(document).ready(function() {
  if(UserCtrl.Event.checking()){
    _ini();
  }else{
    LoginCtrl._ini();
  }
});

