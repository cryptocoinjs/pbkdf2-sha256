test-node:
	@mocha 

test-browser:
	@node test-browser.js & echo "$$!" > /tmp/pbkdf2-sha256-browser-test.pid
	@sleep 1
	@open http://localhost:8080

kill: #if test-browser fails, you'll want to call this
	@cat /tmp/pbkdf2-sha256-browser-test.pid | xargs kill
	@rm /tmp/pbkdf2-sha256-browser-test.pid