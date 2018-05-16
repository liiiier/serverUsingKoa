import mongoose from 'mongoose';
const connect_Str = 'mongodb://localhost/music'
const options = {  
  server: {
    auto_reconnect: true,
    poolSize: 10
  }
}
mongoose.connect(connect_Str, function(err, res) {
  if(err) {
    console.log('[mongoose log] Error connecting to: ' + connect_Str + '. ' + err);
  } else {
    console.log('[mongoose log] Successfully connected to: ' + connect_Str);
  }
});
export default mongoose