import com.mongodb.MongoClient;
public class MongoDemo {

	public static void main(String[] args) {
		MongoClient mongoClient = new MongoClient("localhost", 27017);
		DB db = mongoClient.getDB("test");

	}

}
