
document.addEventListener("DOMContentLoaded", 
        function(){
                document.write (
                        [
                            "self.location", 
                            "navigator.userAgent"
                        ].map(
                                function(s){
                                    return  s + ' = ' + eval(s);
                                }
                        ).join("<br>\n")
                );
        }
, false);
document.addEventListener("deviceready", 
        function(){
                document.write (
                        [
                            "device.name", 
                            "device.platform", 
                            "device.model", 
                            "device.version", 
                        ].map(
                                function(s){
                                    return  s + ' = ' + eval(s);
                                }
                        ).join("<br>\n")
                );
        }
, false);
