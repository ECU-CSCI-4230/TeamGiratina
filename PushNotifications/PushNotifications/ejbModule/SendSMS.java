/* 
 * Luke PEarson 3/12/2019
 *  SendSMS will send a text message. The program requires two command line parameters.
 *  
 *  SendSMS num "message"
 *  
 *  num is the phone number that you want to send a message to. "message" is the String that
 *  will be the meat and potato of the message.
 *  
 *  Example:
 *  SendSMS +19194577950 "This is the text"
 */
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

public class SendSMS {
    public static final String ACCOUNT_SID =
            "ACd18c806ce7b1108b807babab4d6afe19";
    public static final String AUTH_TOKEN =
            "eea6fa87b58a7690d7010f176d6187af";

    public static void main(String[] args) {
    	String toNumber = args[0];
    	String text = args[1];
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        Message message = Message
                .creator(new PhoneNumber(toNumber), // to
                        new PhoneNumber("+19842058491"), // from
                        text)
                .create();

        System.out.println(message.getSid());
    }
} 