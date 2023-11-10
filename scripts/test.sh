#!/usr/bin/env bash

rm highlights.md
sh format_highlights.sh Animal_Farm.txt highlights.md
open -a Writer\ Pro highlights.md
