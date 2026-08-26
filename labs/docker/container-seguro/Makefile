.PHONY: setup verify cleanup
setup:
	docker compose up -d --build --wait
verify:
	@test "$$(docker compose exec -T app id -u)" != "0"
	@docker compose exec -T app sh -c 'touch /blocked' >/dev/null 2>&1 && exit 1 || true
	@docker inspect docker-secure-app --format '{{json .HostConfig.CapDrop}}' | grep -q ALL
	@echo "Usuário não-root, filesystem read-only e capabilities validados."
cleanup:
	docker compose down --remove-orphans --rmi local
