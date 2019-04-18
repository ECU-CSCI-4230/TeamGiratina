import com.mongodb.DBCursor;
import com.mongodb.DBObject;

public class PushNotifications {

	public static void main(String[] args) {
		DBCursor cursor = DocMaker.main(args);
		
		
		while(cursor.hasNext()) {
			DBObject a = cursor.next();
			int reminders = 0;
			String name = (String) a.get("firstName");
			String sms = "Hello " + name + ".";
			String number = "+1" + (String) a.get("phoneNumber");
			boolean exercise = (boolean) a.get("notifyExercise");
			boolean water = (boolean) a.get("notifyWater");
			boolean cook = (boolean) a.get("notifyCook");
			if(exercise) reminders++;
			if(cook) reminders++;
			if(water) reminders++;
			if(reminders == 1) {
				sms = sms + " Here is your daily reminder.";
			} else {
				sms = sms + " Here are your " + reminders + " daily reminders.";
			}
			if(exercise) sms = sms + " Get active today!";
			if(cook) sms = sms + " Cook yourself a good meal tonight!";
			if(water) sms = sms + " Drink 3 liters of water daily!";
			sms = sms + " Make it a great day or not: the choice is yours.";
			
			String[] pipeAway = new String[2];
			pipeAway[0] = number;
			pipeAway[1] = sms;
			SendSMS.main(pipeAway);
		}
	}

}
