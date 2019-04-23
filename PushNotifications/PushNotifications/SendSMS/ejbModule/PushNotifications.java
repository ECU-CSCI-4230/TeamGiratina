import com.mongodb.DBCursor;
import com.mongodb.DBObject;

public class PushNotifications {

	public static void main(String[] args) {
		DBCursor cursor = DocMaker.main(args);
		int reminders = 0;
		String[] pipeAway = new String[2];
		while (cursor.hasNext()) {
			DBObject a = cursor.next();
			String name = (String) a.get("firstName") + " " + (String) a.get("lastName");
			String sms = "Hello " + name + ".";
			pipeAway[0] = "+1" + (String) a.get("phoneNumber");
			boolean exercise = (boolean) a.get("notifyExercise");
			boolean water = (boolean) a.get("notifyWater");
			boolean cook = (boolean) a.get("notifyCook");
			if (exercise)
				reminders++;
			if (cook)
				reminders++;
			if (water)
				reminders++;
			if (reminders == 1) {
				sms = sms + " Here is your daily reminder.";
			} else {
				sms = sms + " Here are your " + reminders + " daily reminders.";
			}
			if (exercise)
				sms = sms + " Get active today!";
			if (cook)
				sms = sms + " Cook yourself a good meal tonight!";
			if (water)
				sms = sms + " Drink 3 liters of water daily!";
			pipeAway[1] = sms + " Make it a great day or not: the choice is yours.";
			SendSMS.main(pipeAway);
			reminders = 0;
		}
	}
}
