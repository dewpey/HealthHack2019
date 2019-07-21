#include <eosio/eosio.hpp>

using namespace eosio;

class [[eosio::contract("healthhack")]] healthhack : public eosio::contract {

public:
  using contract::contract;
  
  healthhack(name receiver, name code,  datastream<const char*> ds): contract(receiver, code, ds) {}

  [[eosio::action]]
  void create(name user, std::string prescription, int id, int amount) {
    require_auth( user );
    address_index addresses( get_self(), get_first_receiver().value );
    auto iterator = addresses.find(user.value);
    if( iterator == addresses.end() )
    {
      addresses.emplace(user, [&]( auto& row ) {
       row.key = user;
       row.prescription = prescription;
       row.id = id;
       row.amount = amount;
       row.status = 0;
      });
    }
  }

  [[eosio::action]]
  void pickup(int id, name sender) {
    address_index addresses( get_self(), get_first_receiver().value );
    auto iterator = addresses.find(id);
    addresses.modify(iterator, eosio::name("pillager"), [&]( auto& row ) {
        row.key = sender;
        row.status = 1;
      });
  }
  
  [[eosio::action]]
  void deliver(int id, name sender) {
    address_index addresses( get_self(), get_first_receiver().value );
    auto iterator = addresses.find(id);
    addresses.modify(iterator, sender, [&]( auto& row ) {
        row.status = 2;
      });
  }

  [[eosio::action]]
  void erase(int id) {
    address_index addresses( get_self(), get_first_receiver().value);

    auto iterator = addresses.find(id);
    check(iterator != addresses.end(), "Record does not exist");
    //require_auth(iterator->key);
    addresses.erase(iterator);
  }
  

private:
  struct [[eosio::table]] prescription {
    name key;
    std::string prescription;
    int amount;
    int id;
    int status;
    uint64_t primary_key() const { return id; }
  };
  typedef eosio::multi_index<"prescription"_n, prescription> address_index;

};
