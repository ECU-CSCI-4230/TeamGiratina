
from __future__ import print_function
from apiclient.discovery import build
from httplib2 import Http
from oauth2client import file, client, tools

try:
	import argparse
	flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
	flags = NONE

SCOPES = 'https://www.googleapis.com/auth/calendar'
store = file.Storage('storage.json')
creds = store.get()
if not creds or creds.invalid:
		flow = client.flow_from_clientsecrets('credentials.json', SCOPES)
		creds = tools.run_flow(flow, store, flags) \
			if flags else tools.run(flow, store)
CAL = build('calendar', 'v3', http=creds.authorize(Http()))

GMT_OFF = '-07:00'	# PDT/MST/GMT-7
EVENT = {
	'summary': 'Dinner with freinds',
	'start': {'dateTime': '2019-08-28T19:00:00%s' % GMT_OFF},
	'end': {'dateTime': '2019-08-28T22:00:00%s' % GMT_OFF},
}

e = CAL.events().insert(calendarId='primary',
		sendNotifications=False, body=EVENT).execute()

print('''*** %r event added:
	start: %s
	End:    %s''' % (e['summary'].encode('utf-8'),
	e['start']['dateTime'], e['end']['dateTime']))