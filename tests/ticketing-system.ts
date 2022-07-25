import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from "chai";
import { TicketingSystem } from "../target/types/ticketing_system";

const { SystemProgram } = anchor.web3;

describe("ticketing-system", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.TicketingSystem as Program<TicketingSystem>;

  let _ticketingSystem: anchor.web3.Keypair;

  it("initializes 3 tickets to program account", async () => {
    const ticketingSystem = anchor.web3.Keypair.generate();
    let tickets = [111, 222, 333];
    const tx = await program.rpc.initialize(tickets, {
      accounts: {
        ticketingSystem: ticketingSystem.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [ticketingSystem],
    });

    const account = await program.account.ticketingSystem.fetch(
      ticketingSystem.publicKey
    );

    assert.ok(account.ticketList.length === 3);
  });
});
