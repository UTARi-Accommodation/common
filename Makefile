publish:
	@read -p "What is your commit message: " COMMIT\
	&& yarn build && git add . && git commit -m "$${COMMIT}" && git push
