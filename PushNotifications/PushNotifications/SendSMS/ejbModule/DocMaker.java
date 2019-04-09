import java.util.List;
import java.util.Scanner;
import java.util.Set;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;

public class DocMaker {

	public static void main(String[] args) {
		MongoClient mongoClient = connectToServer();
		DB db = selectDB(mongoClient);
		listCollections(db);
	}

	private static void listCollections(DB db) {
		Set<String> collections = db.getCollectionNames();
		System.out.println("The collections that exist in this db are:");
		for(int i = collections.size(); i > 0; i--) {
			System.out.println(collections.iterator().next());
		}
	}

	private static DB selectDB(MongoClient mongoClient) {
		Scanner kbd = new Scanner(System.in);
		String response = "c";
		String database = null;
		while (!response.startsWith("y")) {
			listDatabases(mongoClient);
			System.out.println("Which db do you want to grab? Enter a new name to create a new db.");
			database = kbd.next();
			List<String> dbs = mongoClient.getDatabaseNames();
			if (!dbs.contains(database)) {
				System.out.println("Do you want to make a new database with the name \"" + database + "\"? y/n");
				response = kbd.next().toLowerCase();
			}
			else {
				response = "y";
			}
		}
		return mongoClient.getDB(database);
	}

	private static MongoClient connectToServer() {
		Scanner kbd = new Scanner(System.in);
		int port = 0;
		String ipAddr = null;
		String response = "k";
		MongoClient mongoClient = null;

		System.out.println("Would you like to connect to 127.0.0.1 on port 27017? y/n");
		response = kbd.next();
		if (response.startsWith("y")) {
			port = 27017;
			ipAddr = "127.0.0.1";
		} else {
			response = "n";
			while (!response.startsWith("y")) {
				System.out.println("What is the IP address of the server you want to connect to? ");
				ipAddr = kbd.next();
				System.out.println("Port number: ");
				port = kbd.nextInt();
				System.out.println("Connect to " + ipAddr + " on port " + port + "? y/n");
				response = kbd.next().toLowerCase();
			}
			kbd.close();
		}
		try {
			mongoClient = new MongoClient(ipAddr, port);
		} catch (MongoException e) {
			e.printStackTrace();
		} finally {
			if (mongoClient != null)
				System.out.println("Connected to " + ipAddr + " on port " + port + "! :)");
		}
		return mongoClient;
	}

	private static void listDatabases(MongoClient mongoClient) {
		List<String> dbs = mongoClient.getDatabaseNames();
		System.out.println("The databases that exist on this server are:\n");
		for (int i = 0; i < dbs.size(); i++) {
			System.out.println(dbs.get(i));
		}
	}
}