from bs4 import BeautifulSoup
import urllib2
import browsercookie

myCookies = browsercookie.chrome()

urlToScrape = "http://ringzer0team.com/challenges/13"

def retrieveMessage():
	pageOpener = urllib2.build_opener(urllib2.HTTPCookieProcessor(myCookies))
	rawHtml = pageOpener.open(urlToScrape).read()
	parsedHtml = BeautifulSoup(rawHtml,"html.parser")

	msg = parsedHtml.find_all("div", class_="message")

	print msg

retrieveMessage();