-module(aetherion_ledger).
-export([init_db/0, seed_db/0, get_all/0]).

-record(entity, {id, name, category, role}).

init_db() ->
    %% Create the Mnesia schema on the local node and start the database
    mnesia:create_schema([node()]),
    mnesia:start(),
    
    %% Create the table with disk persistence
    mnesia:create_table(entity, [
        {attributes, record_info(fields, entity)},
        {disc_copies, [node()]}
    ]),
    io:format("~n[AETHERION LEDGER] Mnesia Database initialized.~n").

seed_db() ->
    Entities = [
        %% === THE ARCHITECTURE CORE ===
        #entity{id=1, name="Mandlenkosi Vundla", category="Leadership", role="Sovereign Architect"},
        #entity{id=2, name="Mrs Codex", category="Leadership", role="Co-Founder & Advisor"},
        #entity{id=3, name="Sempi Mvala", category="Leadership", role="Co-Founder & Advisor"},
        #entity{id=4, name="Theodore Swarts", category="Leadership", role="Co-Founder & Advisor"},

        %% === GLOBAL TECH VETERANS & BILLIONAIRES ===
        #entity{id=5, name="Elon Musk", category="Global Tech Veterans", role="Entity"},
        #entity{id=6, name="Bernard Arnault", category="Global Elite", role="Entity"},
        #entity{id=7, name="Jeff Bezos", category="Global Tech Veterans", role="Entity"},
        #entity{id=8, name="Larry Ellison", category="Global Tech Veterans", role="Entity"},
        #entity{id=9, name="Bill Gates", category="Global Tech Veterans", role="Entity"},
        #entity{id=10, name="Larry Page", category="Global Tech Veterans", role="Entity"},
        #entity{id=11, name="Sergey Brin", category="Global Tech Veterans", role="Entity"},
        #entity{id=12, name="Steve Ballmer", category="Global Tech Veterans", role="Entity"},
        #entity{id=13, name="Mark Zuckerberg", category="Global Tech Veterans", role="Entity"},

        %% === ROYALTY, POLITICS & ELITE ===
        #entity{id=14, name="Queen Elizabeth", category="Global Celebrities", role="Entity"},
        #entity{id=15, name="Cyril Ramaphosa", category="Global Politicians", role="Entity"},
        #entity{id=16, name="Ace Magashule", category="Global Politicians", role="Entity"},
        #entity{id=17, name="Johann Rupert", category="Global Elite", role="Entity"},

        %% === VUNDLA DYNASTY & NETWORK ===
        #entity{id=18, name="Peter Vundla", category="Vundla Family", role="Entity"},
        #entity{id=19, name="Mfundi Vundla", category="Vundla Family", role="Entity"},
        #entity{id=20, name="Mhlangabezi Vundla", category="Vundla Family", role="Entity"},
        #entity{id=21, name="Themba Vundla", category="Vundla Family", role="Entity"},
        #entity{id=22, name="Karren Johnson Vundla", category="Vundla Family", role="Entity"},
        #entity{id=23, name="Thandiwe Vundla", category="Vundla Family", role="Entity"},
        #entity{id=24, name="Corrine McClinton", category="Extended Network", role="Entity"},
        #entity{id=25, name="Mthwakazi Dladla", category="Extended Network", role="Entity"},

        %% === FAMILIES & CONGLOMERATES ===
        #entity{id=26, name="Oppenheimer Family", category="Dynasty", role="Entity"},
        #entity{id=27, name="De Beers", category="Global Companies", role="Entity"},
        #entity{id=28, name="Vundla Family", category="Dynasty", role="Entity"},
        #entity{id=29, name="Moyo Family", category="Dynasty", role="Entity"},
        #entity{id=30, name="Chigwada Family", category="Dynasty", role="Entity"},
        #entity{id=31, name="Buthelezi Family", category="Dynasty", role="Entity"},
        #entity{id=32, name="Dladla Family", category="Dynasty", role="Entity"},
        #entity{id=33, name="Tshukulu Family", category="Dynasty", role="Entity"},
        #entity{id=34, name="Makhubu Family", category="Dynasty", role="Entity"},
        #entity{id=35, name="Resilient Signals", category="Global Companies", role="Entity"},

        %% === ABSTRACT GLOBAL GROUPS ===
        #entity{id=36, name="Global Entities", category="Aggregate", role="Entity"},
        #entity{id=37, name="Global Celebrities", category="Aggregate", role="Entity"},
        #entity{id=38, name="Global Musicians", category="Aggregate", role="Entity"},
        #entity{id=39, name="Global Politicians", category="Aggregate", role="Entity"},
        #entity{id=40, name="Global Sport Veterans", category="Aggregate", role="Entity"},
        #entity{id=41, name="Global Tech Veterans", category="Aggregate", role="Entity"},
        #entity{id=42, name="Global Companies", category="Aggregate", role="Entity"},

        %% === FOUNDATIONS, EDUCATION & DEVELOPMENT ===
        #entity{id=43, name="Sparrow Rainbow Village", category="Foundations & NGOs", role="Entity"},
        #entity{id=44, name="Talisman Foundation", category="Foundations & NGOs", role="Entity"},
        #entity{id=45, name="ALX Africa", category="Education & Development", role="Entity"},
        #entity{id=46, name="UFS", category="Education & Development", role="Entity"},
        #entity{id=47, name="Kutloanong High School", category="Education & Development", role="Entity"},
        #entity{id=48, name="UVU Africa Capaciti", category="Education & Development", role="Entity"},

        %% === KEY INDIVIDUALS ===
        #entity{id=49, name="Tsakane Mohale", category="Extended Network", role="Entity"},
        #entity{id=50, name="Sherin Kgabo Phihlela", category="Extended Network", role="Entity"}
    ],
    
    %% Execute the transaction to write all entities safely
    F = fun() ->
        lists:foreach(fun(E) -> mnesia:write(E) end, Entities)
    end,
    
    case mnesia:transaction(F) of
        {atomic, ok} -> io:format("~n[AETHERION LEDGER] Seeded 50 Global Entities successfully.~n");
        {aborted, Reason} -> io:format("~n[SYS_ERR] Transaction failed: ~p~n", [Reason])
    end.

get_all() ->
    %% Retrieve all records from the entity table
    F = fun() -> mnesia:match_object(#entity{_ = '_'}) end,
    {atomic, Results} = mnesia:transaction(F),
    Results.
