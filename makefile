run: run_server run_client

run_server:
	mvn spring-boot:run

run_client:
	cd client
	npm install
	npm start