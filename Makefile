ifeq (${SKIP_FORGE}, true)
  INSTALL_CMD := echo skip forge install
else
  INSTALL_CMD := forge install
endif

build :; forge build
clean :; forge clean
test-contract :; forge test --match-path test/UmbraOGSupporter.t.sol
install :; $(INSTALL_CMD)
