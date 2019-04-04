import java.util.List;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;
 
/**
* Created by TutorialKart on 31/10/17.
*/
public class Manager {
    public static void main(String[] args) {
        MongoClient mongoClient = null;
        try {
            mongoClient = new MongoClient( "127.0.0.1" , 27017 );
            List<String> dbs = mongoClient.getDatabaseNames();
            for(int i = 0; i < dbs.size(); i++) {
            	System.out.println(dbs.get(i));
            }
 
            System.out.println("Connected to MongoDB!");
        } catch (MongoException e) {
            e.printStackTrace();
        } finally {
            if(mongoClient!=null)
                mongoClient.close();
        }
    }
}
