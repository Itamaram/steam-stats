'use client'

import React, { useState } from 'react';
import { Game } from './api/users/[user]/route';
import DataTable from 'react-data-table-component';
import Image from 'next/image';
import _ from 'lodash';

const Page = () => {
    const [id, setId] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [games, setGames] = useState<Game[]>([]);

    const handleSubmit = async () => {
        setGames([]);
        setIsLoading(true);
        try {
            const response = await fetch(`/api/users/${id}`);
            const data = await response.json();
            setGames(data.games);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col place-items-center p-24">
            <div className="max-w-5xl w-full">
                <h1 className="text-6xl font-bold mb-4 text-center">Steam library stats</h1>
            </div>

            <div className="grid grid-cols-4 w-full max-w-5xl py-2">
                <input
                    type="text"
                    className="border border-gray-300 rounded-md px-4 py-2 mr-2 input-field col-start-2"
                    placeholder="Enter your steam id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded input-field"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Search'}
                </button>
            </div>

            <div className="grid text-center grid-cols-4 max-w-5xl w-full py-2">
                <div className="col-start-2">
                    Total number of games: {games.length}
                </div>
                <div>
                    Total playtime: {(_.sumBy(games, g => g.playtime) / 60).toFixed(2)} hours
                </div>
            </div>

            <div className="w-full max-w-2xl py-2">
                {games.length > 0 && (
                    <DataTable
                        columns={[
                            { width: "66px", cell: (game: Game) => <Image data-tag="allowRowEvents" width={32} height={32} src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img}.jpg`} alt={`${game.name}'s app icon`} /> },
                            { name: 'Game', selector: (game: Game) => game.name, sortable: true },
                            { id: 'Playtime', name: 'Playtime (hours)', selector: (game: Game) => game.playtime, format: (g: Game) => (g.playtime / 60).toFixed(0), sortable: true, right: true },
                        ]}
                        data={games}
                        pagination
                        defaultSortAsc={false}
                        defaultSortFieldId={'Playtime'}
                        onRowClicked={(game: Game) => window.open(`https://store.steampowered.com/app/${game.appid}`)}
                        pointerOnHover
                        striped
                    />
                )}
            </div>
        </main >
    );
};

export default Page;
