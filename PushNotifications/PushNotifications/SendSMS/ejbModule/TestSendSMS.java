
/* THIS PROGRAM IS FOR TESTING PURPOSES ONLY
 * THIS PROGRAM ONLY WORKS FOR PHONES INSIDE THE US.
 * Please excuse my half-hearted attempt at phone number validation.
 * It catches the mistakes I expect people to make. But not all edge
 * cases are accounted for.
 */

import java.util.Scanner;

public class TestSendSMS {

	public static void main(String[] args) {
		boolean validated = false;
		String[] stuff = new String[2];
		Scanner kbd = new Scanner(System.in);
		kbd.useDelimiter("\n");
		while (validated == false) {
			System.out.println("Please enter a phone number to send the text to: \n"
					+ "Note 0: must include country code + 10 digits. (Example: +19194577950)\n"
					+ "Note 1: USA code = +1\n");
			stuff[0] = kbd.next();
			if (stuff[0].length() == 13 && stuff[0].startsWith("+1")) {
				validated = true;
			}
		}
		System.out.println("Please enter a messege to send to " + stuff[0] + "\n");
		stuff[1] = kbd.next();
		SendSMS.main(stuff);
		kbd.close();
	}
}
