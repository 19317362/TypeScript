//
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

/// <reference path="formatting.ts"/>

module ts.formatting {
    export class FormattingManager {
        private options: TypeScript.FormattingOptions;

        constructor(private sourceFile: SourceFile, private snapshot: ITextSnapshot, private rulesProvider: RulesProvider, editorOptions: ts.EditorOptions) {
            //
            // TODO: convert to use FormattingOptions instead of EditorOptions
            this.options = new TypeScript.FormattingOptions(!editorOptions.ConvertTabsToSpaces, editorOptions.TabSize, editorOptions.IndentSize, editorOptions.NewLineCharacter);
        }

        public formatSelection(minChar: number, limChar: number): ts.TextEdit[] {
            var span = TypeScript.TextSpan.fromBounds(minChar, limChar);
            return this.formatSpan(span, FormattingRequestKind.FormatSelection);
        }

        public formatDocument(minChar: number, limChar: number): ts.TextEdit[] {
            var span = TypeScript.TextSpan.fromBounds(minChar, limChar);
            return this.formatSpan(span, FormattingRequestKind.FormatDocument);
        }

        public formatOnPaste(minChar: number, limChar: number): ts.TextEdit[] {
            var span = TypeScript.TextSpan.fromBounds(minChar, limChar);
            return this.formatSpan(span, FormattingRequestKind.FormatOnPaste);
        }

        public formatOnSemicolon(caretPosition: number): ts.TextEdit[] {
            var semicolonPositionedToken = findToken(this.sourceFile, caretPosition - 1);

            if (semicolonPositionedToken && semicolonPositionedToken.kind === SyntaxKind.SemicolonToken) {
                // Find the outer most parent that this semicolon terminates
                var current = semicolonPositionedToken;
                // TODO: COMMENTED OUT
                while (current.parent && current.parent.getEnd() === semicolonPositionedToken.getEnd() && current.parent.kind !== SyntaxKind.SyntaxList
                     /*&&                     current.parent.kind !== SyntaxKind.List*/) {
                    current = current.parent;
                }

                // Compute the span
                var span = new TypeScript.TextSpan(current.getFullStart(), current.getFullWidth());

                // Format the span
                return this.formatSpan(span, FormattingRequestKind.FormatOnSemicolon);
            }

            return [];
        }

        public formatOnClosingCurlyBrace(caretPosition: number): ts.TextEdit[] {
            var closeBracePositionedToken = findToken(this.sourceFile, caretPosition - 1);

            if (closeBracePositionedToken && closeBracePositionedToken.kind === SyntaxKind.CloseBraceToken) {
                // Find the outer most parent that this closing brace terminates
                var current = closeBracePositionedToken;
                while (current.parent &&
                    current.parent.getEnd() === closeBracePositionedToken.getEnd() && current.parent.kind !== SyntaxKind.SyntaxList /*&&   current.parent.kind !== SyntaxKind.List*/) {
                    current = current.parent;
                }

                // Compute the span
                var span = new TypeScript.TextSpan(current.getFullStart(), current.getFullWidth());

                // Format the span
                return this.formatSpan(span, FormattingRequestKind.FormatOnClosingCurlyBrace);
            }

            return [];
        }

        public formatOnEnter(caretPosition: number): ts.TextEdit[] {
            var lineNumber = this.snapshot.getLineNumberFromPosition(caretPosition);

            if (lineNumber > 0) {
                // Format both lines
                var prevLine = this.snapshot.getLineFromLineNumber(lineNumber - 1);
                var currentLine = this.snapshot.getLineFromLineNumber(lineNumber);
                var span = TypeScript.TextSpan.fromBounds(prevLine.startPosition(), currentLine.endPosition());

                // Format the span
                return this.formatSpan(span, FormattingRequestKind.FormatOnEnter);

            }

            return [];
        }

        private formatSpan(span: TypeScript.TextSpan, formattingRequestKind: FormattingRequestKind): ts.TextEdit[] {
            // Always format from the beginning of the line
            var startLine = this.snapshot.getLineFromPosition(span.start());
            span = TypeScript.TextSpan.fromBounds(startLine.startPosition(), span.end());

            var result: ts.TextEdit[] = [];

            var formattingEdits = Formatter.getEdits(span, this.sourceFile, this.options, true, this.snapshot, this.rulesProvider, formattingRequestKind);

            //
            // TODO: Change the ILanguageService interface to return TextEditInfo (with start, and length) instead of TextEdit (with minChar and limChar)
            formattingEdits.forEach((item) => {
                result.push({
                    minChar: item.position,
                    limChar: item.position + item.length,
                    text: item.replaceWith
                });
            });

            return result;
        }
    }
}