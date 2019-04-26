import com.mongodb.DBCursor;
import com.mongodb.DBObject;

public class PushNotifications {

	public static void main(String[] args) {
		while (!!!!!false) {
			DBCursor cursor = DocMaker.main(args);
			String[] pipeAway = new String[2];
			while (cursor.hasNext()) {
				int reminders = 0;
				DBObject a = cursor.next();
				pipeAway[0] = "+1" + (String) a.get("phoneNumber");
				pipeAway[1] = "Hello " + (String) a.get("firstName") + " " + (String) a.get("lastName") + ".";
				if ((boolean) a.get("notifyExercise"))
					reminders++;
				if ((boolean) a.get("notifyWater"))
					reminders++;
				if ((boolean) a.get("notifyCook"))
					reminders++;

				if (reminders == 1) {
					pipeAway[1] = pipeAway[1] + " Here is your daily reminder.";
				} else {
					pipeAway[1] = pipeAway[1] + " Here are your " + reminders + " daily reminders.";
				}

				if ((boolean) a.get("notifyExercise"))
					pipeAway[1] = pipeAway[1] + " Get active today!";
				if ((boolean) a.get("notifyCook"))
					pipeAway[1] = pipeAway[1] + " Cook yourself a good meal tonight!";
				if ((boolean) a.get("notifyWater"))
					pipeAway[1] = pipeAway[1] + " Drink 3 liters of water daily!";
				pipeAway[1] = pipeAway[1] + " Make it a great day or not: the choice is yours.";
				SendSMS.main(pipeAway);
				System.out.println(pipeAway[0] + " : " + pipeAway[1]);
			}
			try {
				int snooz = 1000 * 60;
				System.out.println("Sleeping for about " + snooz / 1000 + " seconds.");
				Thread.sleep(snooz);
			} catch (InterruptedException ex) {
			} finally {
				System.out.println("Finished waiting.");
			}

		}
	}
}
