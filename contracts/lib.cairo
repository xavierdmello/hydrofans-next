#[starknet::interface]
trait IHydroFans<TContractState> {
    fn set_daily_intake(ref self: TContractState, user_id: felt252, intake: u128);
    fn get_daily_intake(self: @TContractState, user_id: felt252, day: u128) -> u128;
    fn get_longest_streak(self: @TContractState, user_id: felt252) -> u128;
}

#[starknet::contract]
mod hydro_fans {
    use starknet::get_caller_address;
    use starknet::ContractAddress;
    use array::ArrayTrait;

    #[storage]
    struct Storage {
        // Mapping of user ID to an array of daily water intakes
        user_daily_intake: Dict<felt252, Dict<u128, u128>>,
        // Mapping of user ID to their longest streak
        user_longest_streak: Dict<felt252, u128>,
    }

    #[abi(embed_v0)]
    impl HydroFans of super::IHydroFans<ContractState> {
        fn set_daily_intake(ref self: ContractState, user_id: felt252, intake: u128) {
            let mut user_data = self.user_daily_intake[user_id].read().unwrap_or_default();
            let day = starknet::get_block_timestamp();
            user_data[day] = intake;
            self.user_daily_intake[user_id].write(user_data);

            // Update longest streak
            let mut current_streak = 0;
            let mut longest_streak = self.user_longest_streak[user_id].read().unwrap_or(0);
            let mut day_index = 0;
            
            while let Some(&day_intake) = user_data.get(day_index) {
                if day_intake > 0 {
                    current_streak += 1;
                    if current_streak > longest_streak {
                        longest_streak = current_streak;
                    }
                } else {
                    current_streak = 0;
                }
                day_index += 1;
            }

            self.user_longest_streak[user_id].write(longest_streak);
        }

        fn get_daily_intake(self: @ContractState, user_id: felt252, day: u128) -> u128 {
            self.user_daily_intake[user_id].read().unwrap_or_default().get(day).unwrap_or_default()
        }

        fn get_longest_streak(self: @ContractState, user_id: felt252) -> u128 {
            self.user_longest_streak[user_id].read().unwrap_or_default()
        }
    }
}
