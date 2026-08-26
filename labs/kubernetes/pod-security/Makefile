LAB := pod-security
NAMESPACE := pe-security
include ../common.mk
.PHONY: verify
verify: guard
	@kubectl apply -f compliant-pod.yaml
	@kubectl wait --for=condition=Ready pod/compliant -n $(NAMESPACE) --timeout=90s
	@kubectl run privileged -n $(NAMESPACE) --image=busybox:1.37.0 --overrides='{"spec":{"containers":[{"name":"privileged","image":"busybox:1.37.0","command":["sleep","60"],"securityContext":{"privileged":true}}]}}' -- sleep 60 >/dev/null 2>&1 && exit 1 || true
	@echo "Pod seguro aceito e pod privilegiado rejeitado."
