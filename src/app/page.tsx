'use client'

import React, { useState } from 'react';
import { Game } from './api/users/[user]/route';
import _ from 'lodash';
import GamesTable from './games-table';

const Page = () => {
    const [steamid, setSteamId] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [games, setGames] = useState<Game[]>([]);

    const handleSubmit = async () => {
        setGames([]);
        setIsLoading(true);
        try {
            const response = await fetch(`/api/users/${steamid}`);
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
                    value={steamid}
                    onChange={(e) => setSteamId(e.target.value)}
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
                {games.length > 0 && <GamesTable games={games} />}
            </div>
        </main >
    );
};

export default Page;
