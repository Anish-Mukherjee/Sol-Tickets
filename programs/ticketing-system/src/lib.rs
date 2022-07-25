use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod ticketing_system {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>,tickets:Vec<u32>) -> Result<()> {
        let ticketing_system = &mut ctx.accounts.ticketing_system;
        let owner = ticketing_system.to_account_info().key;

        for (idx,ticket) in tickets.iter().enumerate(){
            ticketing_system.ticket_list[idx] = Ticket{
                owner: *owner,
                id: *ticket,
                available: true,
                idx: idx as u32,
            }
        }
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info>{
    #[account(init,payer=user,space=1024+1024)]
    pub ticketing_system : Account<'info,TicketingSystem>,
    #[account(mut)]
    pub user : Signer<'info>,
    pub system_program : Program<'info,System>,
}

#[account]
pub struct TicketingSystem{
    pub ticket_list:[Ticket;3],
}

#[derive(Clone,Debug,AnchorSerialize,AnchorDeserialize,Copy,Default)]
pub struct Ticket{
    pub owner: Pubkey,
    pub id: u32,
    pub available: bool,
    pub idx: u32,
}
